<?php
namespace app\admin\model;
use think\Model;
use traits\model\SoftDelete;

class Tp5Cmplnt extends Model
{
    //导入软删除方法集
    use SoftDelete;

    //设置软删除字段，该字段只有为NULL时，才会被显示
    protected $deleteTime = 'delete_time';
    protected $autoWriteTimestamp = 'true';  
}
