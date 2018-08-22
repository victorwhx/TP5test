<?php

namespace app\admin\controller;
use app\admin\model\Grade as GradeModel;
use app\admin\model\Teacher;
use think\Request;

class Grade extends Base
{
    public function gradeList()
    {
        $grade = GradeModel::all();

        $count = GradeModel::count();

        foreach ($grade as $value) {
            $data = [
                'id' => $value->id,
                'name' => $value->name,
                'length' => $value->length,
                'price' => $value->price,
                'status' => $value->status,
                'create_time' => $value->create_time,
                //用关联方法teacher()属性方式访问teacher表中数据
                'teacher' => isset($value->teacher->name) ? $value->teacher->name : '<span style="color:red">未分配</span>',
            ];
            //每次关联查询结果，保存到数组gradelist[]中
            $gradeList[] = $data;
        }

        $this->view->assign('gradeList', $gradeList);
        $this->view->assign('count', $count);

        return $this->view->fetch('grade_list');
    }

    public function setStatus(Request $request)
    {
        $grade_id = $request->param('id');

        $result = GradeModel::get($grade_id);

        if ($result->getData('status') == 1)
        {
            GradeModel::update(['status'=>0], ['id'=>$grade_id]);
        }
        else
        {
            GradeModel::update(['status'=>1], ['id'=>$grade_id]);
        }
    }

    public function gradeAdd()
    {
        //给模板赋值seo变量
        $this->view->assign('title','编辑班级');
        $this->view->assign('keywords','php.cn');
        $this->view->assign('desc','PHP中文网ThinkPHP5开发实战课程');

        //渲染添加模板
        return $this->view->fetch('grade_add');
    }

    public function doAdd(Request $request)
    {
        //从提交表单中获取数据
        $data = $request->param();

        //插入当前记录
        $result = GradeModel::create($data);

        $status = 0;
        $message = '添加失败，请检查';

        if (true == $result)
        {
            $status = 1;
            $message = '添加成功！';
        }

        //自动转为json格式返回
        return ['status'=>$status, 'message'=>$message];
    }

    public function gradeEdit(Request $request)
    {
        //获取到要编辑的班级ID
        $grade_id = $request->param('id');

        //根据ID进行查询
        $result = GradeModel::get($grade_id);

        //关联查询,获取与当前班级对应的教师姓名
        if ($result->teacher)
        {
            $result->teacher = $result->teacher->name;
        }
        else
        {
            $result->teacher = '未分配';
        }

        //给当前页面seo变量赋值
        $this->view->assign('title','编辑班级');
        $this->view->assign('keywords','php.cn');
        $this->view->assign('desc','PHP中文网ThinkPHP5开发实战课程');

        //给当前编辑模板赋值
        $this->view->assign('grade_info',$result);

        //渲染编辑模板
        return $this->view->fetch('grade_edit');
    }

    public function doEdit(Request $request)
    {
        //从提交表单中排除关联字段teacher字段
        $data = $request->except('teacher');
        //$data = $request -> param(); //如果全部获取,报错：数据表字段不存在:[teacher]

        //设置更新条件
        $condition = ['id'=>$data['id']];

        //更新当前记录
        $result = GradeModel::update($data,$condition);

        //设置返回数据
        $status = 0;
        $message = '更新失败,请检查';

        //检测更新结果
        if (true == $result) {
            $status = 1;
            $message = '恭喜, 更新成功~~';
        }

        return ['status'=>$status, 'message'=>$message];
    }

    public function deleteGrade(Request $request)
    {
        $grade_id = $request->param('id');

        GradeModel::update(['is_delete'=>1], ['id'=>$grade_id]);
        GradeModel::destroy($grade_id);
    }

    public function couldRecover()        //判断当前是否存在可恢复的数据
    {
        $where = function($query)
        {
            $query->field(['id'])->where('is_delete','=',1);
        };
        $result = GradeModel::withTrashed()->select($where);

        $i = 0;
        $data = [];
        foreach ($result as $value) {
            $data[$i++] = $value->id;
        }

        if (empty($result))
        {
            return ['status'=>0, 'message'=>'暂无可更新的数据'];
        }
        else    //存在可恢复的数据，按id进行恢复
        {
            for ($i=0; $i<count($data); $i++)
            {
                GradeModel::update(['delete_time'=>NULL, 'is_delete'=>0],['id'=>$data[$i]]);
            }
            return ['status'=>1];
        }
    }













}

?>
