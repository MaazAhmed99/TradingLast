export const ramdomImage = (username) => {
  return `https://ui-avatars.com/api/?name=${username}&background=random&size=512`;
};

export const responses = (e) => {
  console.log("responses", e?.response);
  if (e?.response?.status === 400) {
    return { type: "danger", message: e?.response?.data?.message };
  } else if (e?.response?.status === 200) {
    return { type: "success", message: e?.response?.data?.message };
  } else {
    return { type: "danger", message: e?.message };
  }
};

export const responsesLogin = (e) => {
  console.log("responsesLogin", e);
  if (e?.status === 400) {
    return { type: "danger", message: e?.data?.message };
  } else if (e?.status === 200) {
    return { type: "success", message: e?.data?.message };
  } else {
    return { type: "danger", message: e?.message };
  }
};
