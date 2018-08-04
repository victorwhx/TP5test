<?php
namespace app\admin\controller;

class Index extends Base
{
    public function index()
    {
        $this->isLogin();           //判断用户是否登录
        return $this->fetch();
    }

    public function welcome()
    {
        return $this->fetch();
    }
}
