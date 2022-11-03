export const formatImgUrl = (game: any) => {
  if(game.img !== null) return game.img;

  var provider = game.provider;

  if(game.provider == 'blueprint' || game.provider == 'merkur') {
    provider = 'epicmedia';
  } else  if(game.provider == 'booongo'  || game.provider == 'goldenrace' || game.provider == 'igrosoft' || game.provider == 'leander' || game.provider == 'playson') {
    provider = 'infin';
  } else  if(game.provider == 'bigtimegaming' || game.provider == 'hacksaw') {
    provider = 'relax';
  } else  if(game.provider == 'gamomat' || game.provider == 'goldenhero') {
    provider = 'oryx';
  } else  if(game.provider == 'microgaming') {
    provider = 'quickfire';
  } else  if(game.provider == 'caleta' || game.provider == 'onetouch') {
    provider = 'hub88';
  }

  return 'https://cdn.softswiss.net/i/s3/' + provider + '/' + game.id.split(':')[1] + '.png';
} 

