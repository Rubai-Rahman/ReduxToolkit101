# WorkspaceCreator Component

The `WorkspaceCreator` component provides a comprehensive workspace creation interface with form validation, name uniqueness checking, automatic admin role assignment, and success/error feedback.

## Features

- ✅ **Form Validation**: Client-side validation using the validation library
- ✅ **Name Uniqueness Checking**: Real-time validation against existing workspace names
- ✅ **Automatic Admin Role Assignment**: Creator automatically becomes workspace admin
- ✅ **Success/Error Feedback**: Clear feedback for creation success or failure
- ✅ **Multiple Variants**: Dialog, card, and inline display options
- ✅ **Accessibility**: Proper ARIA labels and keyboard navigation
- ✅ **Loading States**: Visual feedback during creation process

## Usage

### Dialog Variant

```tsx
import WorkspaceCreator from '@/components/workspace/WorkspaceCreator';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = (workspace) => {
    console.log('Workspace created:', workspace);
    // Handle successful creation
  };

  return (
    <WorkspaceCreator
      variant="dialog"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onSuccess={handleSuccess}
    />
  );
}
```

### Card Variant

```tsx
<WorkspaceCreator
  variant="card"
  onSuccess={handleSuccess}
  className="max-w-md"
/>
```

### Inline Variant

```tsx
<WorkspaceCreator
  variant="inline"
  onSuccess={handleSuccess}
  title="Custom Title"
  description="Custom description"
/>
```

## Props

| Prop           | Type                                           | Default                  | Description                                     |
| -------------- | ---------------------------------------------- | ------------------------ | ----------------------------------------------- |
| `variant`      | `'dialog' \| 'card' \| 'inline'`               | `'dialog'`               | Display variant                                 |
| `isOpen`       | `boolean`                                      | `false`                  | Dialog open state (dialog variant only)         |
| `onOpenChange` | `(open: boolean) => void`                      | -                        | Dialog open state handler (dialog variant only) |
| `onSuccess`    | `(workspace: CreateWorkspaceResponse) => void` | -                        | Success callback                                |
| `onCancel`     | `() => void`                                   | -                        | Cancel callback                                 |
| `className`    | `string`                                       | `''`                     | Additional CSS classes                          |
| `title`        | `string`                                       | `'Create New Workspace'` | Component title                                 |
| `description`  | `string`                                       | Default description      | Component description                           |

## Validation Rules

### Workspace Name

- **Required**: Must not be empty
- **Length**: 2-50 characters
- **Pattern**: Letters, numbers, spaces, hyphens, and underscores only
- **Uniqueness**: Must not conflict with existing workspace names

### Description

- **Optional**: Can be empty
- **Length**: Maximum 500 characters when provided

## API Integration

The component integrates with the following API endpoints:

- `POST /api/workspaces` - Create workspace
- `GET /api/workspaces/validate-name` - Validate workspace name uniqueness

## Error Handling

The component handles various error scenarios:

- **Validation Errors**: Client-side validation with field-specific error messages
- **Network Errors**: Connection issues with retry suggestions
- **Server Errors**: API errors with user-friendly messages
- **Conflict Errors**: Name conflicts with alternative suggestions

## Success Flow

1. User fills out the form
2. Real-time name validation occurs
3. Form validation passes
4. API request is made
5. Success state is shown with admin role confirmation
6. Workspace is added to Redux store
7. Success callback is triggered
8. Dialog auto-closes (for dialog variant)

## Testing

The component includes comprehensive tests covering:

- Form validation
- Name uniqueness checking
- API integration
- Error handling
- Success states
- Different variants
- Accessibility features

Run tests with:

```bash
yarn test src/components/workspace/__tests__/WorkspaceCreator.test.tsx
```

## Dependencies

- React 18+
- Redux Toolkit
- RTK Query
- Lucide React (icons)
- Custom UI components (Button, Input, Card, etc.)
- Validation library
- Error handling utilities
