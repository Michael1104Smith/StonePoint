<?php
class Csv {
	
	/**
	 * CSV row data converted to PHP array
	 * @var array
	 */
	protected $_rows;
	
	/**
	 * Transformation map from CSV row positions to associative keys
	 * @var array
	 */
	protected $_fieldMap;
	
	/**
	 * Writing methods
	 */
	const FILE = 'file';
	const DOWNLOAD = 'download';
	const STRING = 'string';
	
	/**
	 * Constructor
	 * @param string $file CSV file to read
	 */
	public function __construct($file = null) {
		if(!empty($file)) {
			$this ->read($file);
		}
	}
	
	/**
	 * Read CSV file
	 * @param string $file CSV file to read
	 * @return boolean
	 */
	public function read($file) {
		if(is_file($file)) {
			$handle = fopen($file,'r');
			$rows = array();
			while(!feof($handle)) {
				$row = fgetcsv($handle);
				if(count($row) > 1) {
					$rows[] = $row;
				}
			}
			$this -> _rows = $rows;
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Set CSV fields to PHP array keys map
	 * 
	 * Accepts an associative array with the CSV fields as keys and PHP array keys as values.
	 * If CSV data is already loaded, will run the transformation on the data.
	 * 
	 * @param type $map
	 */
	public function setAssociations($map) {
		$this -> _fieldMap = $map;
		if(!empty($this -> _rows)) {
			$titleRow = array_shift($this -> _rows);
			$rs = array();
			foreach($titleRow as $pos => $title) {
				if(isset($map[$title])) {
					$rs[$map[$title]] = $pos;
				}
			}
			foreach($this -> _rows as &$row) {
				$associativeRow = array();
				foreach($rs as $key => $pos) {
					$associativeRow[$key] = isset($row[$pos]) ? $row[$pos] : '';
				}
				$row = $associativeRow;
			}
		}
	}
	
	/**
	 * Get data rows
	 * @return array
	 */
	public function getRows() {
		return $this -> _rows;
	}
	
	/**
	 * Set data rows
	 * 
	 * Use to load PHP associative array data for CSV file creation
	 * 
	 * @param array $rows
	 */
	public function setRows($rows) {
		$this -> _rows = $rows;
	}
	
	/**
	 * Write CSV file from PHP array data
	 * 
	 * There are 3 output methods for CSV data:
	 *	- As a physical file (pass a full path as the second parameter)
	 *  - As a forced download file (pass the file name as the second parameter)
	 *  - As a string (returns the CSV file as a string)
	 * 
	 * Use class constants for easy access to the method values.
	 * 
	 * @param string $method
	 * @param string $filename
	 * @return string/null
	 */
	public function write($method = self::STRING,$filename = false) {
		$handle = fopen('php://output','w');
		$countries = Lionite_Helper_Countries::$countries;
		$map = $this -> _fieldMap;
		$titles = array_flip($map);
		
		fputcsv($handle, $titles);
		foreach($this -> _rows as $row) {
			$values = array();
			foreach($titles as $key => $title) {
				$values[$key] = isset($row[$key]) ? $row[$key] : '';
				
			}
			
			fputcsv($handle, $values);
		}
		fclose($handle);
		$csv = ob_get_clean();
		switch($method) {
			default:
			case self::STRING :
				return $csv;
			case self::FILE : 
				file_put_contents($filename, $csv);
				break;
			case self::DOWNLOAD :
				self::download($csv,$filename);
				break;
		}		
	}
	
	/**
	 * Start forced download in the browser
	 * @param string $string
	 * @param string $filename
	 */
	protected static function download($string, $filename) {
		$ctype = 'application/force-download';
		header("Cache-Control: cache, must-revalidate");
		header("Pragma: public");
		header('Content-Type: ' . $ctype);
		header('Content-Disposition: attachment; filename="' . $filename . '"');
		header('Content-Length: '.mb_strlen($string,'latin1'));
		echo $string;
	}
}