import { addDoc, getDocs, collection, doc, onSnapshot, orderBy, query, where, limit } from 'firebase/firestore'; 
import { db } from './firebase';
import { RECEIPTS_ENUM, onError, props } from '../pages/dashboard';

// Name of receipt collection in Firestore
const RECEIPT_COLLECTION = 'receipts';

//gift receipt
export async function giftReceipt(uid, customerName, customerPhone, timestamp, txnType, addAmount, finalBalance) {

  try {
    const querySnapshot = await getDocs(query(collection(db, RECEIPT_COLLECTION), where('customerPhone', '==', customerPhone),  where('uid', '==', uid), orderBy('timestamp', 'desc'), limit(1)));

    let finalBalanceValue = 0;
    if (!querySnapshot.empty) {
      const receipt = querySnapshot.docs[0].data();
      finalBalanceValue = receipt.finalBalance;
    }

    const newReceipt = {
      uid, customerName, customerPhone, timestamp, txnType, addAmount,
      finalBalance: addAmount + finalBalanceValue
    };
    await addDoc(collection(db, RECEIPT_COLLECTION), newReceipt);
  } catch (error) {
    console.error(error);
  }
}


//add receipt
export async function addReceipt(uid, customerName, customerPhone, timestamp, txnType, addAmount, finalBalance) {

  try {
    const querySnapshot = await getDocs(query(collection(db, RECEIPT_COLLECTION), where('customerPhone', '==', customerPhone),  where('uid', '==', uid), orderBy('timestamp', 'desc'), limit(1)));

    let finalBalanceValue = 0;
    if (!querySnapshot.empty) {
      const receipt = querySnapshot.docs[0].data();
      finalBalanceValue = receipt.finalBalance;
    }

    const newReceipt = {
      uid, customerName, customerPhone, timestamp, txnType, addAmount,
      finalBalance: addAmount + finalBalanceValue
    };
    await addDoc(collection(db, RECEIPT_COLLECTION), newReceipt);
  } catch (error) {
    console.error(error);
  }
}


// redeem receipt
export async function redeemReceipt(uid, customerName, customerPhone, timestamp, txnType, redeemAmount, finalBalance) {
  try {
    const querySnapshot = await getDocs(query(collection(db, RECEIPT_COLLECTION), where('customerPhone', '==', customerPhone),  where('uid', '==', uid), orderBy('timestamp', 'desc'), limit(1)));

    //let finalBalanceValue = 0;
    if (!querySnapshot.empty) {
      const receipt = querySnapshot.docs[0].data();

      if (receipt.finalBalance < redeemAmount) {
        console.log('low balanceee');
      props.onError(RECEIPTS_ENUM.redeem);
        
      } 
        let finalBalanceValue = receipt.finalBalance - redeemAmount;

        const newReceipt = {
          uid, customerName, customerPhone, timestamp, txnType, redeemAmount,
          finalBalance: finalBalanceValue
        };

        await addDoc(collection(db, RECEIPT_COLLECTION), newReceipt);
        props.onSuccess(RECEIPTS_ENUM.redeem);
        console.log('check');
        
    }
      console.log('no acc');
     // props.onError(RECEIPTS_ENUM.redeem);
  } catch (error) {
  props.onError(RECEIPTS_ENUM.redeem);
}
}


//get with totl balnce

//get receipt
export async function getReceipts(uid, setReceipts, setIsLoadingReceipts) {
  const receiptsQuery = query(collection(db, RECEIPT_COLLECTION), where("uid", "==", uid), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(receiptsQuery, async (snapshot) => {
    let allReceipts = [];
    for (const documentSnapshot of snapshot.docs) {
      const receipt = documentSnapshot.data();
      allReceipts.push({
        ...receipt,  
        timestamp: receipt.timestamp.toDate(),
        id: documentSnapshot.id,
      });
    }
    setReceipts(allReceipts);
    setIsLoadingReceipts(false);
  });
  return unsubscribe;
}



//check balance

export async function checkBalance(uid, customerPhone) {
  try {
    const querySnapshot = await getDocs(query(collection(db, RECEIPT_COLLECTION), where('customerPhone', '==', customerPhone),  where('uid', '==', uid), orderBy('timestamp', 'desc'), limit(1)));
    if (!querySnapshot.empty) {
      const receipt = querySnapshot.docs[0].data();
        const customerBalanceQuery = receipt.finalBalance;
        
        console.log('custo: ', customerBalanceQuery);
        // props.onSuccess(RECEIPTS_ENUM.checkBalance);
        return customerBalanceQuery;
      
      }  
    
  } catch (error) {
    props.onError(RECEIPTS_ENUM.checkBalance);
  }
}



/*
export async function getTotalBalance(uid) {
  try {
    const querySnapshot = await getDocs(query(collection(db, RECEIPT_COLLECTION), where('uid', '==', uid), orderBy('timestamp', 'desc')));

    const customerBalances = {};

    querySnapshot.forEach(doc => {
      const receipt = doc.data();
      const phone = receipt.customerPhone;
      const balance = receipt.finalBalance;

      if (!customerBalances[phone]) {
        customerBalances[phone] = balance;
      } else {
        customerBalances[phone] += balance;
      }
    });

    let totalBalance = 0;
    for (const phone in customerBalances) {
      totalBalance += customerBalances[phone];
    }

    return totalBalance;
  } catch (error) {
    console.error(error);
  }
}
*/


/*
// add receipt with Firebase OTP verification

export async function addReceiptWithFirebaseOTP(uid, customerName, customerPhone, timestamp, txnType, addAmount, finalBalance) {
  try {
    const querySnapshot = await getDocs(query(collection(db, RECEIPT_COLLECTION),
      where('customerPhone', '==', customerPhone),
      orderBy('timestamp', 'desc'),
      limit(1)
    ));
    let finalBalanceValue = 0;

    // Send the OTP to the customer's phone number
    const auth = getAuth();
    const confirmationResult = await signInWithPhoneNumber(auth, customerPhone);
    const verificationId = confirmationResult.verificationId;

    // Ask the user to enter the OTP
    const userOTP = prompt('Please enter the OTP sent to the customer\'s phone number.');

    const credential = PhoneAuthProvider.credential(verificationId, userOTP);
    await auth.signInWithCredential(credential);

    // Set the boolean value to true after OTP verification
    const isOTPVerified = true;
    if (isOTPVerified) {

      if (!querySnapshot.empty) {
        const receipt = querySnapshot.docs[0].data();
        finalBalanceValue = receipt.finalBalance;
      }
      const newReceipt = {
        uid, customerName, customerPhone, timestamp, txnType, addAmount,
        finalBalance: addAmount + finalBalanceValue
      };
      await addDoc(collection(db, RECEIPT_COLLECTION), newReceipt);
    }
  } catch (error) {
    console.error(error);
  }
}


// redeem receipt with Firebase OTP verification

export async function redeemReceiptWithFirebaseOTP(uid, customerName, customerPhone, timestamp, txnType, redeemAmount, finalBalance) {
  try {
    const querySnapshot = await getDocs(query(collection(db, RECEIPT_COLLECTION),
      where('customerPhone', '==', customerPhone),
      orderBy('timestamp', 'desc'),
      limit(1)
    ));

    if (!querySnapshot.empty) {
      const receipt = querySnapshot.docs[0].data();

      if (receipt.finalBalance < redeemAmount) {
        console.log('looooooooow balanceee');
        props.onError(RECEIPTS_ENUM.redeem);
        return;
      }
      
      // Send the OTP to the customer's phone number
      const auth = getAuth();
      const confirmationResult = await signInWithPhoneNumber(auth, customerPhone);
      const verificationId = confirmationResult.verificationId;

      // Ask the user to enter the OTP
      const userOTP = prompt('Please enter the OTP sent to the customer\'s phone number.');

       const credential = PhoneAuthProvider.credential(verificationId, userOTP);
      // await auth.signInWithCredential(credential);
      
      // Set the boolean value to true after OTP verification
      const isOTPVerified = true;
      
      if (isOTPVerified) {
        const finalBalanceValue = receipt.finalBalance - redeemAmount;

        const newReceipt = {
          uid, customerName, customerPhone, timestamp, txnType, redeemAmount,
          finalBalance: finalBalanceValue
        };

        console.log('Doooone daa');
        await addDoc(collection(db, RECEIPT_COLLECTION), newReceipt);
        props.onSuccess(RECEIPTS_ENUM.redeem);

        // Call any other functions that you need to run after successful OTP verification
        // ...
      } else {
        console.log('Incorrect OTP');
        props.onError(RECEIPTS_ENUM.redeem);
        return;
      }
    } else {
      console.log('noooooo acc');
      props.onError(RECEIPTS_ENUM.redeem);
    }
  } catch (error) {
    console.log('errrr');
    props.onError(RECEIPTS_ENUM.redeem);
  }
}
*/
