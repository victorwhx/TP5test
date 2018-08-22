<?php

namespace app\admin\controller;
use app\admin\model\Teacher as TeacherModel;
use think\Request;

class Teacher extends Base
{
    public function teacherList()
    {
        $teacher = TeacherModel::all();

        $count = TeacherModel::count();

        foreach ($teacher as $value) {
            $data = [
                'id' => $value->id,
                'name' => $value->name,
                'degree' => $value->degree,
                'mobile' => $value->mobile,
                'school' => $value->school,
                'hiredate' => $value->hiredate,
                //用关联方法teacher()属性方式访问teacher表中数据
                'grade' => isset($value->grade->name) ? $value->grade->name : '<span style="color:red">未分配</span>',
                'status' => $value->status,
            ];
            //每次关联查询结果，保存到数组teacherlist[]中
            $teacherList[] = $data;
        }

        $this->view->assign('teacherList', $teacherList);
        $this->view->assign('count', $count);

        return $this->view->fetch('teacher_list');
    }

    public function setStatus(Request $request)
    {
        $teacher_id = $request->param('id');

        $result = TeacherModel::get($teacher_id);

        if ($result->getData('status') == 1)
        {
            TeacherModel::update(['status'=>0], ['id'=>$teacher_id]);
        }
        else
        {
            TeacherModel::update(['status'=>1], ['id'=>$teacher_id]);
        }
    }

    public function teacherAdd()
    {
        //给模板赋值seo变量
        $this->view->assign('title','编辑班级');
        $this->view->assign('keywords','php.cn');
        $this->view->assign('desc','PHP中文网ThinkPHP5开发实战课程');

        //将班级表中所有数据赋值给当前模板
        $this->view->assign('gradeList',\app\admin\model\Grade::all());

        //渲染添加模板
        return $this->view->fetch('teacher_add');
    }

    public function doAdd(Request $request)
    {
        //从提交表单中获取数据
        $data = $request->param();

        //插入当前记录
        $result = TeacherModel::create($data);

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

    public function teacherEdit(Request $request)
    {
        //获取到要编辑的班级ID
        $teacher_id = $request->param('id');

        //根据ID进行查询
        $result = TeacherModel::get($teacher_id);

        //给当前页面seo变量赋值
        $this->view->assign('title','编辑教师信息');
        $this->view->assign('keywords','php.cn');
        $this->view->assign('desc','PHP中文网ThinkPHP5开发实战课程');

        //给当前编辑模板赋值
        $this->view->assign('teacher_info',$result);

        //将班级表中所有数据赋值给当前模板
        $this->view->assign('gradeList',\app\admin\model\Grade::all());

        //渲染编辑模板
        return $this->view->fetch('teacher_edit');
    }

    public function doEdit(Request $request)
    {
        //从提交表单中排除关联字段teacher字段
        $data = $request->except('teacher');
        //$data = $request -> param(); //如果全部获取,报错：数据表字段不存在:[teacher]

        //设置更新条件
        $condition = ['id'=>$data['id']];

        //更新当前记录
        $result = TeacherModel::update($data,$condition);

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


    //软删除操作
    public function deleteTeacher(Request $request)
    {
        $teacher_id = $request -> param('id');
        TeacherModel::update(['is_delete'=>1],['id'=> $teacher_id]);
        TeacherModel::destroy($teacher_id);

    }

    //恢复删除操作
    public function unDelete()
    {
        TeacherModel::update(['delete_time'=>NULL],['is_delete'=>1]);
    }













}

?>
