function standardize(voucher) {
  return {
    region: "VN",
    data: {
      voucher_id: voucher.voucher_id,
      top_up_amount: voucher.top_up_amount,
      scheduled_time: Math.floor(
        new Date(voucher.scheduled_time).getTime() / 1000.0
      ),
      is_rollover: true,
    },
  };
}

async function registerVoucher(voucher) {
  return await fetch(
    "https://admin.promotion.shopee.vn/api/gateway/v1/voucher/admin/create_quota_top_up_task",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authority: "admin.promotion.shopee.vn",
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        region: "VN",
        credentials: "include",
      },
      body: JSON.stringify(voucher),
    }
  );
}

async function registerVouchers(vouchers) {
  return await Promise.all(
    vouchers.map(async (voucher) => {
      var standardized_voucher = standardize(voucher);
      var response = await registerVoucher(standardized_voucher);
      var body = response.status == 442 ? await response.text() : "";

      return {
        ...voucher,
        request: JSON.stringify(standardized_voucher),
        response: body,
        status: response.status,
      };
    })
  );
}

module.exports = { standardize, registerVoucher, registerVouchers };
