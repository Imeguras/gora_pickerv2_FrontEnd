
	export function matrixToValues (matrixStr: string) {
		//check if its even a matrix [)>
		matrixStr.match(/^\[\)>/) || (() => {throw new Error("Not a matrix")})();
		const matrixObject:any = {}
		matrixStr = matrixStr.replace(/^\[\)>/, '')
		//replace '\u001
		//foreach pair of \u001e
		const fields = matrixStr.split('\u001e')
		//replace \u002d with \u001d
		/**fields.forEach((field, index) => {
			fields[index] = field.replace(/\u002d/g, '\u001d')
		})**/
		fields.shift()
		//check how many fields there are
		if(fields.length > 2){
			//pop the last one, its empty
			fields.pop()
			//remove the front one too
			
		}
		let int_fields: number =0
		
		fields.forEach((field) => {
			
			const groups = field.split('\u001d')
			//the first group is the datamatrix version
			matrixObject['datamatrix_version'] = groups.shift()
			matrixObject[int_fields]= groups
			int_fields++
		})
		return matrixObject
	}
	export function teConversion(object:any){
		const teObject:any = {}

		//iterate through the object
		object[0].forEach((field, index) => {
			if(field.match(/^Q.+/)){
				teObject["Quantity"] = parseInt(field.replace(/^Q/, ''))
			}
			if(field.match(/^[0-9]?P.+/)){
				teObject["PartNumber"] = field.replace(/^[0-9]?P/, '') 
			}
		}); 
		return teObject
	}