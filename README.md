# 🎯 Spin The Wheel - WordPress Plugin

A customizable and feature-rich spin-the-wheel plugin for WordPress with advanced theming, analytics, and optimization features.

## 🚀 Features

- **Custom Wheel Themes**: Create unlimited custom wheel designs
- **Advanced Theming**: Full control over colors, fonts, borders, and animations
- **Analytics Dashboard**: Track spins, results, and user engagement
- **REST API**: Complete API for theme and data management
- **Performance Optimized**: Caching, lazy loading, and optimized assets
- **Error Handling**: Comprehensive error boundary and logging
- **Mobile Responsive**: Works perfectly on all devices
- **Shortcode Support**: Easy integration anywhere in WordPress
- **Developer Friendly**: Hooks, filters, and extensible architecture

## 📁 Project Structure

```
spin-the-wheel/
├── 📂 classes/                     # PHP Classes (PSR-4 Autoloaded)
│   ├── 📂 Components/              # Reusable components
│   │   ├── 📂 RouletteTheme/       # Theme management
│   │   │   ├── ThemeApi.php        # Theme REST API
│   │   │   └── ThemeFields.php     # Theme validation rules
│   │   ├── 📂 SliceData/           # Wheel data management
│   │   │   ├── DataApi.php         # Data REST API
│   │   │   └── DataFields.php      # Data validation rules
│   │   └── ThemeSelector.php       # Theme selector component
│   ├── 📂 System/                  # Core system classes
│   │   ├── Database.php            # Database operations
│   │   ├── Enqueue.php             # Asset management
│   │   ├── Menu.php                # Admin menu setup
│   │   ├── RestAPI.php             # Base REST API class
│   │   └── Validator.php           # Data validation
│   └── 📂 Traits/                  # Reusable traits
│       ├── ResponseTrait.php       # API response formatting
│       └── SingletonTrait.php      # Singleton pattern
├── 📂 includes/                    # Helper files
│   ├── Activator.php               # Plugin activation/deactivation
│   ├── Autoloader.php              # Fallback autoloader
│   ├── Config.php                  # Plugin configuration
│   ├── functions.php               # Helper functions
│   ├── log.php                     # Logging utilities
│   └── plugin-constants.php       # Plugin constants
├── 📂 src/                         # Modern JavaScript source
│   ├── 📂 admin/                   # Admin interface
│   │   ├── index.jsx               # Admin entry point
│   │   ├── 📂 components/          # Admin components
│   │   ├── 📂 pages/               # Admin pages
│   │   ├── 📂 providers/           # Admin context providers
│   │   └── 📂 styles/              # Admin styles
│   ├── 📂 frontend/                # Frontend interface
│   │   ├── index.jsx               # Frontend entry point
│   │   ├── 📂 components/          # Frontend components
│   │   ├── 📂 providers/           # Frontend context providers
│   │   └── 📂 styles/              # Frontend styles
│   └── 📂 shared/                  # Shared utilities
│       ├── 📂 components/          # Shared components
│       │   └── ErrorBoundary.jsx   # Error handling
│       ├── 📂 config/              # Configuration files
│       │   └── themeConfig.json    # Ant Design theme
│       ├── 📂 hooks/               # Custom React hooks
│       ├── 📂 providers/           # Shared context providers
│       └── 📂 utils/               # Utility functions
│           ├── api.js              # API client
│           └── validation.js       # Validation utilities
├── 📂 ui-resources/                # Built assets (generated)
├── 📂 vendor/                      # Composer dependencies
├── Plugin.php                      # Main plugin class
├── spin-the-wheel.php              # Plugin entry point
├── composer.json                   # PHP dependencies
├── package.json                    # Node.js dependencies
├── webpack.config.js               # Build configuration
└── README.md                       # This file
```

## 🛠️ Development Setup

### Prerequisites

- PHP 7.4 or higher
- WordPress 5.0 or higher
- Node.js 16 or higher
- Composer (for PHP dependencies)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AhnabShahin/Spin-The-Wheel.git
   cd Spin-The-Wheel
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Build assets**
   ```bash
   # Development build (with source maps)
   npm run dev
   
   # Production build (optimized)
   npm run build
   
   # Watch mode (auto-rebuild on changes)
   npm start
   ```

### Development Commands

```bash
# Build and watch for changes
npm start

# Production build
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Run tests
npm run test

# Clean build directory
npm run clean

# Analyze bundle size
npm run analyze
```

## 🏗️ Architecture

### PHP Architecture

The plugin follows modern PHP practices with:

- **PSR-4 Autoloading**: Organized namespace structure
- **Singleton Pattern**: Efficient resource management
- **Dependency Injection**: Loosely coupled components
- **REST API**: Complete CRUD operations
- **Data Validation**: Comprehensive input validation
- **Caching**: Performance optimization
- **Error Handling**: Graceful error recovery

### JavaScript Architecture

Modern React-based frontend with:

- **Component-Based**: Reusable UI components
- **Context API**: State management
- **Error Boundaries**: Graceful error handling
- **API Client**: Centralized HTTP requests
- **Validation**: Form and data validation
- **Code Splitting**: Optimized bundle loading
- **TypeScript Ready**: Easy migration path

## 📚 API Documentation

### Theme API

```php
// Get all themes
GET /wp-json/stw/v1/template

// Get specific theme
GET /wp-json/stw/v1/template/{id}

// Create theme
POST /wp-json/stw/v1/template

// Update theme
PUT /wp-json/stw/v1/template/{id}

// Delete theme
DELETE /wp-json/stw/v1/template/{id}
```

### Data API

```php
// Get wheel data
GET /wp-json/stw/v1/data/{id}

// Update wheel data
PUT /wp-json/stw/v1/data/{id}

// Get analytics
GET /wp-json/stw/v1/analytics

// Save spin result
POST /wp-json/stw/v1/analytics/spin
```

## 🎨 Customization

### PHP Hooks

```php
// Modify plugin components
add_filter('stw_plugin_components', function($components) {
    $components['custom'] = new CustomComponent();
    return $components;
});

// Customize admin data
add_filter('stw_admin_localized_data', function($data) {
    $data['custom_setting'] = get_option('my_custom_setting');
    return $data;
});
```

## 🚀 Performance Optimizations

### Backend Optimizations

1. **Database Query Optimization**
2. **Asset Management**
3. **Caching Strategy**

### Frontend Optimizations

1. **Bundle Optimization**
2. **Runtime Performance**
3. **User Experience**

## 🔒 Security

- **Nonce Verification**: All AJAX requests
- **Capability Checks**: User permissions
- **Data Sanitization**: Input/output sanitization
- **SQL Injection Prevention**: Prepared statements
- **XSS Protection**: Escaped output

## 📄 License

GPL-2.0-or-later - see LICENSE file for details.

---

Made with ❤️ by [Ahnab Shahin](https://github.com/AhnabShahin)
