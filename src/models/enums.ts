export enum GiftStatusLabel {
  Delivered = 0, //Successful delivery by mailgun
  Opened = 1, //Gift email opened by recipient
  Failed = 2, //Delivery failed. It's a successful order with bad details.
  Resending = 3, //delivery in progress
  Pending = 4, //When CC is involved to resend the failed order further
  Cancelled = 5, // When Customer cancels a placed order by contacting CC team
  Scheduled = 6, //When a gift has been scheduled by a sender using 'Schedule Delivery'
  Completed = 7, //this is a gift status that cannot be mapped to one of the above, at the moment there is only one: CREATED
  Sending = 8,
}
