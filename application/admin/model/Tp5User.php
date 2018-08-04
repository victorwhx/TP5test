<?php
namespace app\admin\model;
use think\Model;

class Tp5User extends Model
{
    public function getRoleAttr($value)
    {
        $role = [
            0=>'普通管理员',
            1=>'root管理员'
        ];

        return $role[$value];
    }

    // 状态字段：status返回值处理
    public function getStatusAttr($value)
    {
        $status = [
            0=>'已停用',
            1=>'已启用'
        ];

        return $status[$value];
    }


}
