import React from 'react';
import Badge from './Badge';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'blacklisted';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getVariantAndLabel = () => {
    switch (status) {
      case 'active':
        return { variant: 'success', label: 'Active' };
      case 'inactive':
        return { variant: 'default', label: 'Inactive' };
      case 'pending':
        return { variant: 'warning', label: 'Pending' };
      case 'approved':
        return { variant: 'success', label: 'Approved' };
      case 'rejected':
        return { variant: 'danger', label: 'Rejected' };
      case 'blacklisted':
        return { variant: 'danger', label: 'Blacklisted' };
      default:
        return { variant: 'default', label: status };
    }
  };

  const { variant, label } = getVariantAndLabel();

  return (
    <Badge variant={variant as any} className={className}>
      {label}
    </Badge>
  );
};

export default StatusBadge;