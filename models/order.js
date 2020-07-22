import moment from 'moment';

class Order {
  constructor(id, content, sum, date) {
    this.id = id;
    this.content = content;
    this.sum = sum;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Order;