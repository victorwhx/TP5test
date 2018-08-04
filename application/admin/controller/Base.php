<?php
namespace app\admin\controller;
use think\Controller;
use think\Session;

class Base extends controller
{
    protected function _initialize()
    {
        //继承父类中的初始化操作
        parent::_initialize();

        //获取session中的user_id，并将其保存为常量
        define('USER_ID', Session::get('user_id'));
    }

    //判断用户是否登录，放在后台的入口：index/index
    protected function isLogin()
    {
        if (empty(USER_ID))
        {
            $this->error('用户未登录，无权访问', url('user/login'));
        }
    }

    protected function alreadyLogin()
    {
        if (!empty(USER_ID))
        {
            $this->error('用户已登录，请勿重复登录', url('index/index'));
        }
    }
}
