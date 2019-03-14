new Promise((resolve, reject) => {
  setTimeout(() => reject('woops'), 500);
}).catch(err=>console.log(err))