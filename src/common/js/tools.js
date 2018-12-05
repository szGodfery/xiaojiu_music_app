/**
 * 格式化数字
 * @param {*} num 
 */
export function format(num) {
  let temp = String(num).split("");
  if (temp.length > 4) {
    let test4 = temp.slice(-4).join("");
    let test = temp.slice(0, temp.length - 4).join("");
    let total = `${test}.${test4}`;
    num = (Math.round(total * 100) / 100).toFixed(1) + "万";
    test4 = null;
    test = null;
  }
  temp = null;
  return num;
}