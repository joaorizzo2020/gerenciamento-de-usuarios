class Utils {

   static dateFormat(date){

        let zero = (date.getMonth()+1 < 10) ? '0' : ''; 
        
        return date.getDate()+'/'+zero+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();

    }


}