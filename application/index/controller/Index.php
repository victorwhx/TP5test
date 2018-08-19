<?php
namespace app\index\controller;
use think\Controller;
use think\request;

class Index extends Controller
{
    public function index()
    {
        //return $this->fetch();
        dump("hell,world.");

        $res = db('tp5_user')->select();
        $html='';

        foreach ($res as $key => $value) {
            $html.=implode('.',$value);
        }

        ob_end_clean();
        pdf($html);die;
        return $this->fetch();
    }
}
