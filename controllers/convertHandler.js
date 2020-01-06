module.exports = class {
	constructor(input){
		this.input = input;
		this.units = [
			["gal", "l", 3.78541],
			[ "lbs", "kg", 0.453592], 
			["mi", "km", 1.60934]
		];
		this.units_str = {
			gal : 'gallon',
			l : 'litre',
			lbs : 'pound',
			kg: 'kilogram',
			mi: 'mile',
			km: 'kilometre'
		}
	}
	set_raw_num_and_unit(){
		let [input, num, unit] = /([^a-zA-z]*)([a-zA-z]*)/.exec(this.input);
		this.num_raw = (num) ? num : 1 ; // if no number set to 1 as default
		this.unit_raw = unit.toLowerCase();
	}
	set_num(){ 
		// (digit)(.)(digit)(/)(digit)(.)(digit)
		let num_pattern = /(^\d+)(\.)?(\d+)?(\/)?(\d+)?(\.)?(\d+)?(\/)?/ 
		let groups = num_pattern.exec(this.num_raw);
		
		let divisor = groups[4];
		let divisor_second = groups[8];
		
		if(divisor_second) return this.num = NaN;
		
		this.num_numerator = this.process_number_groups([groups[1], groups[2], groups[3]]);
		this.num_denominator = this.process_number_groups([groups[5], groups[6], groups[7]]);
		
		// if divisor is not present => process numerator
		if(!divisor) return this.num = this.num_numerator;
		
		// if divisor is present => process denominator then denominator
		return this.num = this.process_fraction();
	}
	process_number_groups(arr_groups){
		let str = arr_groups
			.map( element => (element) ? element : '' )
			.join('');
		
		return parseFloat(str);
	}

	process_fraction(){
		let both_NaN = Number.isNaN(this.num_numerator) && Number.isNaN(this.num_denominator)
		return (both_NaN) ? NaN : (this.num_numerator/this.num_denominator)
	}
	set_unit(){
		this.unit_set = this.units
			.filter( set => set.some( u => u === this.unit_raw ))[0]
		if(this.unit_set) {
			let unit_index = this.unit_set.indexOf(this.unit_raw)
			this.unit_index = unit_index;
			this.unit = this.unit_set[unit_index];
			
			let return_index = (unit_index === 0) ? 1 : 0;
			this.return_index = return_index;
			this.unit_return = this.unit_set[return_index];
		}
		else{
			this.unit = null;
		}
	}
	validite_num_and_unit(){
		this.valid = (this.num && this.unit) ? [true, 'valid number and unit']:
			(!this.num && !this.unit) ? [false, 'invalid number and unit']:
			(!this.num && this.unit) ? [false, 'invalid number']:
			(this.num && !this.unit) ? [false, 'invalid unit']: null;
	}
	set_string_output(){
		this.unit_str = (this.num <= 1) ? this.units_str[this.unit] :  this.units_str[this.unit].concat('s');
		this.unit_return_str = (this.num_return <= 1) ? this.units_str[this.unit_return]: this.units_str[this.unit_return].concat('s');
		this.output_str = `${this.num} ${this.unit_str} converts to ${this.num_return} ${this.unit_return_str}`;
	}
	set_obj_output(){
		this.output_obj = {
			initNum: this.num, 
			initUnit: this.unit, 
			returnNum: this.num_return, 
			returnUnit: this.unit_return, 
			string: this.output_str
		}
	}
	
	convert(){
		this.rate = this.unit_set[2];
		let formula_multiply = (num, rate) => rate * num;
		let formula_divide = (num, rate) => num / rate;
		
		this.formula = (this.unit_index === 0) ? formula_multiply : formula_divide;
		let result = this.formula(this.num, this.rate)
		this.num_return = parseFloat(result.toFixed(5));
		this.set_string_output();
		this.set_obj_output();
	}
	run(){
		this.set_raw_num_and_unit();
		this.set_num();
		this.set_unit();
		this.validite_num_and_unit();
		(this.valid[0]) ? this.convert() : false;
	}
}