/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
// const {createProxyMiddleware} = require("http-proxy-middleware");
// const cors = require("cors");
// const cors = require("cors")({origin: true}); // Import and include the cors middleware
admin.initializeApp();

// Gift And Redeem SMS
exports.smsApi = functions.region("asia-south1").firestore
    .document("receipts/{documentId}")
    .onCreate((snapshot, context) => {
      const newData = snapshot.data(); // Get the newly added data
      const giftAmount = newData.addAmount;
      const redeemAmount = newData.redeemAmount;
      const finalBalance = newData.finalBalance;
      const customerPhone = "+91" + newData.customerPhone;

      let retailStore;

      // Assign the appropriate value to retailStore based on uid
      if (newData.uid === "X9lZIcuotgM9tr2UFrgFIAmh1Ab2") {
        retailStore = "kamalrango store";
      } else if (newData.uid === "Hfcq5rrOspf81bvypNH3PaU16Ih2") {
        retailStore = "kjmart Store";
      } else if (newData.uid === "3") {
        retailStore = "c";
      } else {
        retailStore = "xyz Store";
      }

      const axios = require("axios");
      const qs = require("qs");

      if (newData.txnType === "Gift") {
        const data = qs.stringify({
          "To": customerPhone,
          "Body": "Dear Customer,\n\nCONGRATULATIONS!\n\nYou have received a CASHBACK worth Rs. " + giftAmount + " from " + retailStore + " for being a loyal customer.\n\nYou can use your balance whenever you visit the store next time.\n\nThank You\n-WALLETMAN",
          "From": "WALTMN",
          "DltTemplateId": "1107168300925524168",
          "DltEntityId": "1101674640000069209",
        });

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://b04a0a30eebf1ab71dc779ffc0b5e712f6d9ca74440f8f0c:2fb669341e889b1022f7d2ecfa6f9215776245c9c13f8eb7@api.exotel.com/v1/Accounts/walletman1/Sms/send.json",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic YjA0YTBhMzBlZWJmMWFiNzFkYzc3OWZmYzBiNWU3MTJmNmQ5Y2E3NDQ0MGY4ZjBjOjJmYjY2OTM0MWU4ODliMTAyMmY3ZDJlY2ZhNmY5MjE1Nzc2MjQ1YzljMTNmOGViNw==",
          },
          data: data,
        };

        axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
      } else if (newData.txnType === "Add") {
        const data = qs.stringify({
          "To": customerPhone,
          "Body": "Dear Customer,\n\nYou have added Rs. " + giftAmount + " from your wallet at " + retailStore + ".\n\nYour current balance at the store is Rs. " + finalBalance + ".\n\nThank You \n-WALLETMAN",
          "From": "WALTMN",
          "DltTemplateId": "1107168300972788712",
          "DltEntityId": "1101674640000069209",
        });

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://b04a0a30eebf1ab71dc779ffc0b5e712f6d9ca74440f8f0c:2fb669341e889b1022f7d2ecfa6f9215776245c9c13f8eb7@api.exotel.com/v1/Accounts/walletman1/Sms/send.json",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic YjA0YTBhMzBlZWJmMWFiNzFkYzc3OWZmYzBiNWU3MTJmNmQ5Y2E3NDQ0MGY4ZjBjOjJmYjY2OTM0MWU4ODliMTAyMmY3ZDJlY2ZhNmY5MjE1Nzc2MjQ1YzljMTNmOGViNw==",
          },
          data: data,
        };

        axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
      } else if (newData.txnType === "Redeem") {
        const data = qs.stringify({
          "To": customerPhone,
          "Body": "Dear Customer,\n\nYou have redeemed Rs. " + redeemAmount + " from your wallet at " + retailStore + ".\n\nYour current balance at the store is Rs. " + finalBalance + " \n\nThank You \n-WALLETMAN",
          "From": "WALTMN",
          "DltTemplateId": "1107168300997947197",
          "DltEntityId": "1101674640000069209",
        });

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://b04a0a30eebf1ab71dc779ffc0b5e712f6d9ca74440f8f0c:2fb669341e889b1022f7d2ecfa6f9215776245c9c13f8eb7@api.exotel.com/v1/Accounts/walletman1/Sms/send.json",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic YjA0YTBhMzBlZWJmMWFiNzFkYzc3OWZmYzBiNWU3MTJmNmQ5Y2E3NDQ0MGY4ZjBjOjJmYjY2OTM0MWU4ODliMTAyMmY3ZDJlY2ZhNmY5MjE1Nzc2MjQ1YzljMTNmOGViNw==",
          },
          data: data,
        };

        axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
      }
    });
