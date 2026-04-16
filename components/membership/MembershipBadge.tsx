'use client';

interface MembershipBadgeProps {
  membershipType: 'FREE' | 'SILVER' | 'GOLD';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export default function MembershipBadge({ 
  membershipType, 
  size = 'md', 
  showIcon = true,
  className = '' 
}: MembershipBadgeProps) {
  const getBadgeStyles = () => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full';
    
    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base'
    };

    const typeStyles = {
      FREE: 'bg-gray-100 text-gray-800 border border-gray-300',
      SILVER: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md',
      GOLD: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md'
    };

    return `${baseStyles} ${sizeStyles[size]} ${typeStyles[membershipType]} ${className}`;
  };

  const getIcon = () => {
    switch (membershipType) {
      case 'SILVER':
        return '🥈';
      case 'GOLD':
        return '👑';
      default:
        return '👤';
    }
  };

  const getDisplayName = () => {
    switch (membershipType) {
      case 'FREE':
        return 'Free Member';
      case 'SILVER':
        return 'Silver Member';
      case 'GOLD':
        return 'Gold Member';
      default:
        return 'Member';
    }
  };

  return (
    <span className={getBadgeStyles()}>
      {showIcon && (
        <span className={`${size === 'sm' ? 'mr-1' : 'mr-2'}`}>
          {getIcon()}
        </span>
      )}
      {getDisplayName()}
    </span>
  );
}
