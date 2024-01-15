
	export function matrixToValues (matrixStr: string) {
		//check if its even a matrix [)>
		matrixStr.match(/^\[\)>/) || (() => {throw new Error("Not a matrix")})();
		const matrixObject:any = {}
		matrixStr = matrixStr.replace(/^\[\)>/, '')
		//foreach pair of \u001e
		const fields = matrixStr.split('\u001e')
		//pop the last one, its empty
		fields.pop()
		//remove the front one too
		fields.shift()

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
			if(field.match(/^P.+/)){
				teObject["PartNumber"] = field.replace(/^P/, '') 
			}
		}); 
		return teObject
	}