import crypto from 'crypto'
//encrytion key here
const ENCRYPTION_KEY=process.env.AES_ENCRYPTION_KEY;
//inntialization vector
const IV_LENGTH=16;
const DECRYPTION_KEY=process.env.AES_ENCRYPTION_KEY;
export function encryptData(data)
{
    if(!ENCRYPTION_KEY)
    {
        console.log("encrpyion Key is not set up");
        return
        
    }

    if(!data)
    {
        console.log("Nom dtat provided");
        return null;

    }

    try{
        //create a  random initialization vector of 16 byte length
        const iv=crypto.randomBytes(IV_LENGTH);
        //now just cretae a cipherm object using the algrithm encrylption key utf8 and iv
        const cipher= crypto.createCipheriv('aes-256-cbc',Buffer.from(ENCRYPTION_KEY,'utf8'),iv);
        // now finally create the encrypted data using the cipher and the data itself
        let encrypted=cipher.update(JSON.stringify(data),'utf8','hex'); 
        //finally encrypt the remaining encrypted data and the cipher object cannot be called after the final function
        encrypted+=cipher.final('hex');
        //separator

        let finalEncrypted='';

        const separator=':';
        //iv in hex format
        const ivHex=iv.toString('hex');

        

        //final data encrypted 
         finalEncrypted +=ivHex;
         finalEncrypted +=separator;
         finalEncrypted += encrypted;

        return finalEncrypted;



    }
    catch(error){
        //throw anerror if something unexpected happens
        console.log('Error inside the encryption function',error);
        return null;
    }



}
//function for decrypting the data
export function decryptData(encryptedData){

    if(!ENCRYPTION_KEY)
        {
            console.log("no Decryption key Provided");
            return null;

        } 


     if(!encryptedData)
        {
            console.log("no data Provided");
            return null;

        }   


        try {
            
            //split the encrypted data on the base of the separator
             const separator=':';
             //split the encrypted based on the separator
             const parts = encryptedData.split(separator);

            if(parts.length!==2)
             {
                console.log("Invalid encrypted Data Provided")
                return  null
             }
             // iv hex part
             const ivHex=parts[0];

             //encryptedData hex part after separator
             const encryptedDataHex=parts[1];
             
             //convert the iv in hex back to to the buffer
             const iv= Buffer.from(ivHex,'hex');

             //Create Decipher object
             let decipher=crypto.createDecipheriv('aes-256-cbc',Buffer.from(ENCRYPTION_KEY,'utf8'),iv);

             //decrypt the data
             let decrypted=decipher.update(encryptedDataHex,'hex','utf8');
             decrypted+=decipher.final('utf8');

             //finally return the data
             return JSON.parse(decrypted);
            

        } 
        
        catch (error) {
            console.log("Something is wrong in the decrypition fucntion error",error);
            return null;
        }
}

