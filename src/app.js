import commander from 'commander';
import genDiff from '.';

const runApp = () => {
  commander.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format', 'simple')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig, commander.format));
    })
    .parse(process.argv);
};


export default runApp;
