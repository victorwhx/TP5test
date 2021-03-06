<?php
namespace app\admin\controller;
use think\Request;
use app\admin\model\Tp5User;
use think\Session;
use think\Db;

class User extends Base
{
    public function login()
    {
        $this->alreadyLogin();       //防止用户重复登录
        return $this->fetch();
    }

    public function adminList(Request $request)
    {
        $this->assign('title', 'Admin List');
        $this->assign('keywords', 'PHP教学管理系统');
        $this->assign('desc', '教学案例');

        $this-> view -> count = Tp5User::count();
        $data = $request->param();
        // if (empty($data))
        // {
        //     dump("hello");
        // }
        // else
        // {
        //     dump($data);
        //}

        //判断当前是不是admin用户
        //先通过session获取到用户登陆名
        $userName = Session::get('user_info.name');
        if ($userName == 'admin')
        {
            //$list = Tp5User::all();
            //$map['login_time'] = array('> time', '2018-7-1');
            if (empty($data))
            {
                $sDate = 0;
                $eDate = 253402185600;
            }
            else
            {
                $sDate = $data['sDate'];
                $eDate = $data['eDate'];
            }
            $map['login_time'] = array('between time', ["$sDate", "$eDate 23:59:59"]);
            $map['status'] = 1;

            $list = Db::table('tp5_user')->where($map)->select();
        }
        else
        {
            $list = Tp5User::all(['name'=>$userName]);
        }

        $this->assign('list', $list);

        return $this->fetch('admin_list');
    }

    //验证登录 $this->validate($data, $rule, $msg) 验证数据，规则，失败时提示信息
    public function checkLogin(Request $request)
    {
        //初始返回参数
        $status = 0;
        $result = '';
        $data = $request -> param();

        // 创建验证规则
        $rule = [
            'name|用户名' => 'require',                //用户名必填
            'password|密码' => 'require',            //密码必填
            'verify|验证码' => 'require|captcha',
        ];

        $msg = [
            'name' => ['require' => '用户名不能为空，请检查'],
            'password' => ['require' => '密码不能为空，请检查'],
            'verify' => [
                'require' => '验证码不能为空，请检查',
                'captcha' => '验证码错误',
            ],
        ];

        //进行验证
        $result = $this->validate($data, $rule, $msg);

        //如果验证通过则执行
        if ($result === true)
        {
            //构造查询条件
            $map = [
                'name' => $data['name'],
                'password' => md5($data['password']),
            ];

            //查询用户信息
            $user = Tp5User::get($map);
            if ($user == null)
            {
                $result = '没有找到用户';
            }
            else
            {
                $status = 1;
                $result = '验证通过';
                //设置用户登录信息用：session
                Session::set('user_id', $user->id);
                Session::set('user_info', $user->getData()); //获取用户所有信息
            }
        }

        return ['status'=>$status, 'message'=>$result, 'data'=>$data];
    }

    public function logOut()
    {
        //delete()只删除当前登录用户的session信息
        // destroy()删除所有用户的session信息
        Session::delete('user_id');
        Session::delete('user_info');
        $this->success('注销登录，正在返回', 'user/login');
    }

    public function setStatus(Request $request)
    {
        $user_id = $request->param('id');
        $result = Tp5User::get($user_id);

        if ($result->getData('status') == 1)
        {
            Tp5User::update(['status'=>0],['id'=>$user_id]);
        }
        else
        {
            Tp5User::update(['status'=>1],['id'=>$user_id]);
        }
    }

    public function adminEdit(Request $request)
    {
        $user_id = $request->param('id');
        $result = Tp5User::get($user_id);

        $this->assign('title', '编辑管理员信息');
        $this->assign('keywords','EDIT');
        $this->assign('desc','EDIT_desc');
        $this->assign('user_info', $result->getData());

        return $this->view->fetch('admin_edit');
    }

    public function checkUserName(Request $request)
    {
        $userName = trim($request->param('name'));
        $status=1;
        $message = '用户名可用';

        if (Tp5User::get(['name'=>$userName])) {
            $status = 0;
            $message = '用户名重复，请重新输入。';
        }

        return ['status'=>$status, 'message'=>$message];
    }

    public function checkUserEmail(Request $request)
    {
        $userEmail = trim($request->param('email'));
        $status = 1;
        $message = '邮箱可用';
        //$data = ['email'=>$userEmail];

        if (Tp5User::get(['email'=>$userEmail])) {
            $status = 0;
            $message = '邮箱重复，请重新输入。';
        }
        else
        {
            $result = $this->validate(['email'=>$userEmail], ['email|邮箱'=>'require|email']);
            if ($result !== true)
            {
                $status = 0;
                $message = '邮箱格式不对！';
            }
        }

        return ['status'=>$status, 'message'=>$message];
    }

    public function addUser(Request $request)
    {
        $data = $request->param();
        $status = 1;
        $message = '添加成功';

        $rule = [
            'name|用户名' => "require|min:3|max:10",
            'password|密码' => "require|min:3|max:10",
            'email|邮箱' => 'require|email'
        ];

        //dump($data);
        $result = $this->validate($data, $rule);

        if ($result === true)
        {
            $user = Tp5User::create($request->param());
            if ($user === null)
            {
                $status = 0;
                $message = '添加失败！';
            }
        }
        else
        {
            $status = 0;
            $message = '验证失败！';
        }

        return ['status'=>$status, 'message'=>$message];
    }

    public function adminAdd()
    {
        $this->assign('title', '添加管理员');
        $this->assign('keywords', 'php');
        $this->assign('desc', '教学管理系统');

        return $this->view->fetch('admin_add');
    }

    public function editUser(Request $request)
    {
        //获取表单返回的数据
        $param = $request -> param();

        //去掉表单中为空的数据,即没有修改的内容，防止空数据修改了原内容
        foreach ($param as $key => $value ){
            if (!is_null($value)){
                $data[$key] = $value;
            }
        }

        $condition = ['id'=>$data['id']] ;
        $result = Tp5User::update($data, $condition);

        //如果是admin用户,更新当前session中用户信息user_info中的角色role,供页面调用
        if (Session::get('user_info.name') == 'admin') {
            //Session::set('user_info.role', $data['role']); 未定义索引'role'，报错
            $data['role'] = Session::get('user_info.role');
            Session::set('user_info.role', $data['role']);
        }

        if (true == $result) {
            return ['status'=>1, 'message'=>'更新成功'];
        } else {
            return ['status'=>0, 'message'=>'更新失败,请检查'];
        }
    }

    public function couldRecover()        //判断当前是否存在可恢复的数据
    {
        $where = function($query)
        {
            $query->field(['id'])->where('is_delete','=',1);
        };

        $result = Tp5User::withTrashed()->select($where);
        if (empty($result))
        {
            return ['status'=>0, 'message'=>'暂无可更新的数据'];
        }
        else
        {
            return ['status'=>1];
        }
    }

    public function unDelete()
    {
        //软删除恢复，将is_delete字段清零，delete_time字段恢复为NULL
        $result = Tp5User::update(['delete_time'=>NULL, 'is_delete'=>0],
                                  ['is_delete'=>1]);
    }

    public function deleteUser(Request $request)
    {
        $user_id = $request->param('id');
        Tp5User::update(['is_delete'=>1,],['id'=>$user_id]);
        Tp5User::destroy($user_id);
    }

    public function list_download()
    {
        $sDate = 0;
        $eDate = 253402185600;
        $name = 'test';

        $map['login_time'] = array('between time', ["$sDate", "$eDate 23:59:59"]);
        $map['status'] = 1;

        $list = Db::table('tp5_user')->field(['id','name','email'])->where($map)->select();

        ob_end_clean();
        ob_start();
        header("Content-type:application/octet-stream");           //excel
        header("Accept-Ranges:bytes");
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:attachment;filename=test.xls");
        header("Pragma: no-cache");

        $name = iconv("UTF-8", "GB2312", "姓名");
        $mail = iconv("UTF-8", "GB2312", "邮箱");
        //echo "ID\t".$name."\t".$mail."\t\n";
        echo '<table width=500 height=25 border=0 align=center cellpadding=0 cellspacing=0>';
            echo '<thead><tr>';    //设置thead输出
                echo '<td style="border:1px solid black;padding:10px;text-align:left;"><b>' . 'ID' . '</b></td>';
                echo '<td style="border:1px solid black;padding:10px;text-align:left;"><b>' . $name . '</b></td>';
                echo '<td style="border:1px solid black;padding:10px;text-align:left;"><b>' . $mail . '</b></td>';
            echo '</thead></tr>';

            echo '<tbody>';
            for ($i=0; $i<count($list); $i++)
            {
                echo '<tr>';
                    echo '<td style="border:1px solid black;padding:10px;text-align:left;">' . $list[$i]['id'] . '</td>';
                    echo '<td style="border:1px solid black;padding:10px;text-align:left;">' . iconv("UTF-8", "GB2312", $list[$i]['name']) . '</td>';
                    echo '<td style="border:1px solid black;padding:10px;text-align:left;">' . $list[$i]['email'] . '</td>';
                echo '</tr>';
            }
            echo '</tbody>';
        echo '</table>';
        exit();
    }
}
