export default function gerarRegistro(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const token = [];
  for (let i = 0; i < length; i += 1) {
    token.push(characters[((Math.random() * (characters.length - 1)).toFixed(0))]);
  }
  return token.join('');
}
