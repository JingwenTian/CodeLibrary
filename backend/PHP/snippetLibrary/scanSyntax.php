<?php
/**
 * Description: 批量检测PHP语法脚本
 */
header('Content-type:text/html; charset=utf-8');

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);

$starttime = explode(' ',microtime());

define('PHP_BIN_PATH', '/usr/bin/php');

class RecursiveFileFilterIterator extends FilterIterator
{
	protected $ext = ['php'];
	
	public function __construct($path)
	{

		parent::__construct(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path)));
				    
	}

	public function accept()
	{

		$item = $this->getInnerIterator();
		if($item->isFile() && in_array(pathinfo($item->getFilename(), PATHINFO_EXTENSION), $this->ext))
		{
			return true;	
		}
	}
}

$argvObj = @$argv[2];
if(isset($argvObj))
{
	$fileList = json_decode($argvObj);
	foreach($fileList as $k=>$file)
	{
		//file_put_contents(dirname(__FILE__).'/log.log', $file.PHP_EOL, FILE_APPEND);
		exec(PHP_BIN_PATH.' -ln '.$file, $msg);
		$msg = @array_shift(array_filter($msg));
		if(strpos($msg, 'No syntax errors detected') === false)
		{
			echo $msg.PHP_EOL.'========='.PHP_EOL;
		}
	}
}

$spath = @$argv[1];
if(!isset($spath) || $spath == 'pcntl')
{
	exit;
}
if(!is_dir($spath))
{
	die('No such directory'.PHP_EOL);
}

$cmds = [];
$index = 1;
$groupIndex = 0;
foreach (new RecursiveFileFilterIterator($spath) as $file=>$item)
{
	$cmds[$groupIndex][]=$file;
	if(is_int($index/50) && $index > 0)
	{
		$cmds[$groupIndex] = json_encode($cmds[$groupIndex]);
		$groupIndex++;
		$index = 0;
	}

	$index++;
}

if(is_array($cmds[count($cmds)-1]))
{
	$cmds[count($cmds)-1]=json_encode($cmds[count($cmds)-1]);
}

// pcntl
$pidArr = [];
foreach($cmds as $k=>$cmd)
{
	$pid = pcntl_fork();
	if($pid == -1)
	{
		die('fork child process failure!');
	}
	else if($pid)
	{
		pcntl_wait($status, WNOHANG);
		$pidArr[$k] = $pid;
	}
	else
	{
		pcntl_exec(PHP_BIN_PATH, [__FILE__, 'pcntl', $cmd]);
	}
}

foreach($pidArr as $pid)
{
	pcntl_waitpid($pid, $status);
}

$endtime = explode(' ',microtime());
$thistime = $endtime[0]+$endtime[1]-($starttime[0]+$starttime[1]);
//echo round($thistime,3).PHP_EOL;
