# Example

```javascript
vouchers = [
  {
    voucher_id: 111111111,
    top_up_amount: 1000,
    scheduled_time: "2023-03-03 12:15:30",
  },

  {
    voucher_id: 222222222,
    top_up_amount: 1000,
    scheduled_time: "2023-03-03 12:15:30",
  },
];

result = await registerVouchers(vouchers);

console.log(JSON.stringify(result));
```
