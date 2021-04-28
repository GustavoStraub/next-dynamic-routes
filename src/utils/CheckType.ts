export function CheckType(type: string) {
  switch (type) {
    case 'normal':
      return '#bcbcad'
    case 'grass':
      return '#8dd851'
    case 'fire':
      return '#fa5543'
    case 'water':
      return '#55acff'
    case 'fighting':
      return '#a85645'
    case 'flying':
      return '#79a3ff'
    case 'poison':
      return '#a75c9f'
    case 'ground':
      return '#eccb56'
    case 'rock':
      return '#cebd72'
    case 'bug':
      return '#c2d21f'
    case 'ghost':
      return '#7975d7'
    case 'electric':
      return '#fde53e'
    case 'psychic':
      return '#fa65b5'
    case 'ice':
      return '#96f1ff'
    case 'dragon':
      return '#8a75ff'
    case 'dark':
      return '#896552'
    case 'steel':
      return '#c4c2da'
    case 'fairy':
      return '#f9adff'
    default:
      return '#cecece'
  }
}