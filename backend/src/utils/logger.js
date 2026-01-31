const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

class Logger {
  static info(message, ...args) {
    console.log(`${colors.cyan}ℹ️ [INFO]${colors.reset} ${message}`, ...args);
  }

  static success(message, ...args) {
    console.log(`${colors.green}✅ [SUCCESS]${colors.reset} ${message}`, ...args);
  }

  static warn(message, ...args) {
    console.log(`${colors.yellow}⚠️ [WARN]${colors.reset} ${message}`, ...args);
  }

  static error(message, ...args) {
    console.log(`${colors.red}❌ [ERROR]${colors.reset} ${message}`, ...args);
  }

  static debug(message, ...args) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.magenta}🐛 [DEBUG]${colors.reset} ${message}`, ...args);
    }
  }

  static request(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusColor = res.statusCode >= 400 ? colors.red : 
                         res.statusCode >= 300 ? colors.yellow : colors.green;
      
      console.log(
        `${colors.blue}🌐 [${req.method}]${colors.reset} ${req.originalUrl} ` +
        `${statusColor}${res.statusCode}${colors.reset} ` +
        `${colors.dim}${duration}ms${colors.reset}`
      );
    });
    
    next();
  }

  static database(message, ...args) {
    console.log(`${colors.blue}🗄️ [DATABASE]${colors.reset} ${message}`, ...args);
  }

  static api(message, ...args) {
    console.log(`${colors.green}🚀 [API]${colors.reset} ${message}`, ...args);
  }
}

module.exports = Logger;