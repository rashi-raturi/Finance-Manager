async function deleteTransaction(transactionId){
    try {
        const response = await fetch(`api/v1/account/transactions/${transactionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(response.ok){
            // removing transaction li
            const transactionLi = document.getElementById(`transaction-${transactionId}`);
            if (transactionLi) {
                transactionLi.remove();
            }
            else {
                console.error('Failed to delete transaction');
            }

            location.reload();
        }
        else{
            const result = await response.json();
            alert(result.msg);
        }


    } catch (error) {
        console.log(error);
    }
}
