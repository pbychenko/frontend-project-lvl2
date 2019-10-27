import commander from 'commander';

const runApp = () => {
  commander.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
};


export default runApp;
