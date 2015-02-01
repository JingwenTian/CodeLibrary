<?php

/* @创建一个zip文件 */

function create_zip($files = array(),$destination = '',$overwrite = false) {
    if(file_exists($destination) && !$overwrite){ //检测zip文件是否存在
        return false;
    }
    if(is_array($files)) { //检测文件是否存在
        foreach($files as $file) { //循环通过每个文件
            if(file_exists($file)) { //确定这个文件存在
                $valid_files[] = $file;
            }
        }
    }
    if(count($valid_files)) {
        $zip = new ZipArchive(); //创建zip文件
        if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true){
            return false;
        }
        foreach($valid_files as $file) { //添加文件
            $zip->addFile($file,$file);
        }
        $zip->close();
        return file_exists($destination);

    } else {
        return false;
    }
}

$filename = $dbname . date('Ymd') . ".sql";
$zipfilename=$dbname . date('Ymd') . ".zip";
create_zip(array($filename),$zipfilename,true);//执行压缩文件
