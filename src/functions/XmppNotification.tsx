const Sender = require('node-xcs').Sender;

async function operation() {
  return () => {
    console.log('Listening >>>');

    // Enter firebase credentials here. {SenderID, ServerKey}
    var xcs = new Sender('XXXXXXXX', 'XXXXXXXX');

    xcs.start();

    xcs.on('message', function (messageId, from, data, category) {
      console.log('received message', messageId, from, data, category);
    });

    xcs.on('receipt', function (messageId, from, data, category) {
      console.log('received receipt', arguments);
    });

    xcs.on('error', e => console.warn('XMPP error.', e));
  };
}

async function app() {
  await operation();
}