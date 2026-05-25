'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

/**
 * EXAMPLE: Converting a form component to use next-intl
 * 
 * Key changes:
 * 1. Import useTranslations hook
 * 2. Call t = useTranslations() at component top
 * 3. Replace all hardcoded strings with t('key.path')
 * 4. Use translation keys that match your message files
 */

export function AddAccountFormExample() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'checking',
    balance: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Your API call here
      // await addAccount(formData)
      console.log('Form submitted:', formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t('accounts.addAccount')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('accounts.addAccount')}</DialogTitle>
          <DialogDescription>
            {/* Example of nested translations */}
            {t('accounts.accountName')} {t('common.required', { defaultValue: 'is required' })}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('accounts.accountName')}</Label>
            <Input
              id="name"
              placeholder={t('accounts.accountName')}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">{t('accounts.accountType')}</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="checking">{t('accounts.accountType')}</option>
              <option value="savings">{t('accounts.accountType')}</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="balance">{t('accounts.initialBalance')}</Label>
            <Input
              id="balance"
              type="number"
              placeholder="0.00"
              value={formData.balance}
              onChange={(e) =>
                setFormData({ ...formData, balance: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? t('common.loading') : t('common.save')}
            </Button>
            <Button type="button" variant="outline">
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
