<?php
namespace app\admin\model;
use think\Model;
use traits\model\SoftDelete;

class Tp5User extends Model
{
    //导入软删除方法集
    use SoftDelete;

    //设置软删除字段，该字段只有为NULL时，才会被显示
    protected $deleteTime = 'delete_time';
    protected $autoWriteTimestamp = 'true';  

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
