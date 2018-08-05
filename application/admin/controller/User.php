<?php
namespace app\admin\controller;
use think\Request;
use app\admin\model\Tp5User;
use think\Session;

class User extends Base
{
    public function login()
    {
        $this->alreadyLogin();       //防止用户重复登录
        return $this->fetch();
    }

    public function adminList()
    {
        $this->assign('title', 'Admin List');
        $this->assign('keywords', 'PHP教学管理系统');
        $this->assign('desc', '教学案例');

        $this-> view -> count = Tp5User::count();

        //判断当前是不是admin用户
        //先通过session获取到用户登陆名
        $userName = Session::get('user_info.name');
        if ($userName == 'admin')
        {
            $list = Tp5User::all();
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

    public function editUser(Request $request)
    {
        //获取表单返回的数据
        $param = $request -> param();

        //去掉表单中为空的数据,即没有修改的内容
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

    public function deleteUser(Request $request)
    {
        $user_id = $request->param('id');
        Tp5User::update(['is_delete'=>1],['id'=>$user_id]);
        Tp5User::destroy($user_id);
    }
}
