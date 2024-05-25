export const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); 
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`;
  };

  export function separateAnomalies(array) {
    const result = [];
    let currentSubArray = [];

    array?.forEach((item, index) => {
      if (item.is_anomaly) {
        currentSubArray.push(index);
      } else {
        if (currentSubArray.length) {
          result.push(currentSubArray);
          currentSubArray = [];
        }
      }
    });

    if (currentSubArray.length) {
      result.push(currentSubArray);
    }

    return result;
  }

  export function setRange(arr) {
    let x = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length === 1) continue;
      let y = [arr[i][0], arr[i][arr[i].length - 1]];
      x.push(y);
    }
    return x;
  }