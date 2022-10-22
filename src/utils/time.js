import moment from "moment/moment"
function formatDate(date, formater = 'YYYY-MM-DD HH:mm:ss') {
   return moment(date).format(formater)
}
export default formatDate