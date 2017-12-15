<?php
/**
 * PHP语法检测
 * Description: 批量检测PHP语法脚本
 * 可以结合 git hook 或者上线系统进行语法检测
 */
header('Content-type:text/html; charset=utf-8');
date_default_timezone_set('PRC');
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);

$starttime = explode(' ', microtime());

define('PHP_BIN_PATH', '/usr/bin/php');

function writeLog($message = '')
{
	$log = sprintf('[%s] %s', date('Y-m-d H:s:s'), $message);
	@file_put_contents(sprintf('/tmp/walle/syntax-check-%s.log', date('Ymd')), $log . PHP_EOL, FILE_APPEND);
}

class RecursiveFileFilterIterator extends FilterIterator
{
	protected $ext = ['php'];
	protected $exclude = ['vendor', '.git'];

	public function __construct($path)
	{
		parent::__construct(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path)));
	}

	public function accept()
	{

		$item = $this->getInnerIterator();
		$parentPath = explode('/', pathinfo($item->getPathname(), PATHINFO_DIRNAME))[1];
		if(
			!in_array($parentPath, $this->exclude) &&
			$item->isFile() && 
			in_array(pathinfo($item->getFilename(), PATHINFO_EXTENSION), $this->ext)
		) {
			return true;
		}
	}
}

$argvObj = @$argv[2];

if(isset($argvObj))
{
	$fileList = json_decode($argvObj);
	foreach($fileList as $k => $file)
	{
		writeLog('[INFO]checking file - ' . $file);
		exec(PHP_BIN_PATH . ' -ln ' . $file, $msg);
		$msg = @array_shift(array_filter($msg));
		if(strpos($msg, 'No syntax errors detected') === false)
		{
			writeLog('[ERROR]syntax checking error - ' . $msg);
			echo '[ERROR]syntax checking error - ' . $msg;
			exit(1);
		}
	}
}

$spath = @$argv[1];

if(!isset($spath) || $spath == 'pcntl')
{
	exit(1);
}
if(!is_dir($spath))
{
	writeLog('[ERROR]syntax run error - No such directory');
	echo '[ERROR]syntax run error - No such directory';
	exit(1);
}

$cmds = [];
$index = 1;
$groupIndex = 0;
foreach (new RecursiveFileFilterIterator($spath) as $file => $item)
{
	$cmds[$groupIndex][] = $file;
	if(is_int($index / 50 ) && $index > 0)
	{
		$cmds[$groupIndex] = json_encode($cmds[$groupIndex]);
		$groupIndex++;
		$index = 0;
	}

	$index++;
}

if(is_array($cmds[count($cmds)-1]))
{
	$cmds[count($cmds)-1] = json_encode($cmds[count($cmds)-1]);
}

// pcntl
$pidArr = [];
foreach($cmds as $k => $cmd)
{
	$pid = pcntl_fork();
	if($pid == -1)
	{
		writeLog('[ERROR]syntax run error - Fork child process failure!');
		echo '[ERROR]syntax run error - Fork child process failure!';
		exit(1);
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

writeLog('[INFO]Scan syntx done! timeout: ' . round($thistime,3));
