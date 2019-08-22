const factory = ({ config, fetch }) => {
  const headers = {
    Authorization: `Bearer ${config.ICQKey}`,
    'Content-Type': 'application/json',
  };

  /**
   * Send account created notification
   * @param {object} config Configuration param
   * @param {string} config.email Email to send notification
   * @param {string} config.token Token to confirm email
   */
  const notifyCreate = ({ email, token }) => {
    const body = JSON.stringify({
      email,
      type: 'account.create',
      data: {
        link: `${config.baseURL}/confirm/${token}`,
      },
    });
    const request = fetch(config.ICQUrl, {
      headers,
      body,
      method: 'POST',
    });

    return request
      .then((res) => res.json());
  };

  return Object.freeze({
    notifyCreate,
  });
};

module.exports = factory;
