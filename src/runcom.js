import commander from 'commander';
import genDiff from '.';

const runApp = () => {
  commander.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig)  );
    })
    .parse(process.argv);
};


export default runApp;
