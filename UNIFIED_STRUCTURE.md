# Spin The Wheel Plugin - Custom Roulette Structure

## Overview

The Spin The Wheel plugin has been updated to use a unified data structure that combines wheel data and theme management into a single, streamlined form. This eliminates the need for separate APIs and forms for managing wheel slices and themes.

## What Changed

### Before (Separate Structure)
- **Wheel Data Form**: Managed slice data separately
- **Theme Manager Form**: Configured appearance and behavior
- **Two APIs**: `DataApi.php` and `ThemeApi.php`
- **Two Post Types**: `stw_wheel_data` and `roulette_theme`

### After (Custom Roulette Structure)
- **Single Form**: `CustomRouletteForm.jsx` with repeater fields for slices
- **One API**: `CustomRouletteApi.php`
- **One Post Type**: `stw_roulette`
- **Integrated Management**: All configuration in one place

## New File Structure

### Frontend Components
- `CustomRouletteForm.jsx` - Main form component with slice repeater
- `CustomRouletteManager.jsx` - Parent component managing form and preview
- `CustomRoulette.jsx` - Updated preview component

### Backend Classes
- `CustomRouletteApi.php` - Handles all roulette operations
- `CustomRouletteFields.php` - Validation rules for custom roulette data
- `CustomRouletteMigration.php` - Migrates old data to new structure
- `CustomRouletteMigrationAdmin.php` - Admin interface for migration

## Key Features

### Custom Roulette Form
- **Slice Management**: Add/remove slices with repeater fields
- **Per-Slice Configuration**: Individual colors, fonts, images
- **Global Settings**: Wheel appearance, borders, typography
- **Live Preview**: Real-time updates as you modify settings

### Data Structure
```javascript
{
  name: "Roulette Name",
  description: "Description",
  slices: [
    {
      option: "Slice Text",
      image: {
        uri: "image_url",
        offsetX: 0,
        offsetY: 0,
        sizeMultiplier: 1,
        landscape: false
      },
      style: {
        backgroundColor: "#ff8f43",
        textColor: "#ffffff",
        fontFamily: "Arial",
        fontSize: 16,
        fontWeight: 400,
        fontStyle: "normal"
      },
      optionSize: 1,
      couponId: ""
    }
  ],
  // Global wheel settings
  outerBorderColor: "#000000",
  outerBorderWidth: 5,
  // ... other settings
}
```

### API Endpoints
- `POST /wp-json/stw/v1/roulette` - Create/update roulette
- `GET /wp-json/stw/v1/roulette` - List all roulettes
- `GET /wp-json/stw/v1/roulette/{id}` - Get specific roulette

## Migration

### Automatic Migration
1. Visit WordPress Admin → Spin The Wheel → Data Migration
2. Click "Start Migration" to convert existing data
3. Old data remains intact (backward compatibility)

### What Gets Migrated
- Theme settings → Global roulette settings
- Linked wheel data → Slice arrays
- Meta fields → Unified meta structure
- Post relationships → Single post entries

## Usage Examples

### Basic Implementation
```jsx
import CustomRouletteManager from './components/CustomRouletteManager';

function App() {
  return <CustomRouletteManager />;
}
```

### Custom Form Usage
```jsx
import { Form } from 'antd';
import CustomRouletteForm from './components/CustomRouletteForm';

function MyCustomForm() {
  const [form] = Form.useForm();
  
  const handleSubmit = (values) => {
    // Handle form submission
    console.log('Roulette data:', values);
  };
  
  return (
    <CustomRouletteForm
      form={form}
      handleSubmit={handleSubmit}
      handleFormValuesChange={(changed, all) => {
        // Handle real-time changes
      }}
    />
  );
}
```

## Backward Compatibility

The plugin maintains backward compatibility:
- Old post types still exist
- Previous APIs still function
- Existing data can be migrated
- No data loss during transition

## Benefits

1. **Simplified Workflow**: One form for everything
2. **Better UX**: Immediate preview of changes
3. **Reduced Complexity**: Single API endpoint
4. **Improved Performance**: Fewer database queries
5. **Enhanced Maintenance**: Centralized codebase

## Development Notes

### Form Validation
- Uses Ant Design Form validation
- Server-side validation with `CustomRouletteFields.php`
- Real-time feedback on form errors

### State Management
- Form state automatically syncs with preview
- `handleFormValuesChange` provides real-time updates
- Optimistic UI updates for better performance

### Extensibility
- Easy to add new slice properties
- Configurable validation rules
- Plugin hooks for customization

## Troubleshooting

### Migration Issues
- Check WordPress admin for migration status
- Verify user permissions (manage_options required)
- Review migration logs for specific errors

### Form Issues
- Ensure Ant Design is properly loaded
- Check console for JavaScript errors
- Verify API endpoints are accessible

### API Issues
- Confirm REST API is enabled
- Check nonce verification
- Verify user capabilities match requirements

## Next Steps

1. Test the unified form thoroughly
2. Run migration on existing installations
3. Update documentation and tutorials
4. Consider removing old APIs in future versions
5. Add more advanced features to the unified system
