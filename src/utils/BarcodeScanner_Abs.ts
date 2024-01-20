import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import {isPlatform} from '@ionic/vue'
class BarcodeScanner_Abs {
	isGoogleBarcodeScannerModuleAvailable: boolean = true;
	constructor(){
		this.isGoogleBarcodeScannerModuleAvailable = true;
	}
	async isSupported(){
		return Promise.resolve({value: false});
	}
	async checkPermissions(){
		return Promise.resolve({value: false});
	}
	async scan(){
		
	}
	async installGoogleBarcodeScannerModule(){
		
	}
}

const barcodeScanner:any = isPlatform('capacitor') ? BarcodeScanner : new BarcodeScanner_Abs();

export default barcodeScanner;