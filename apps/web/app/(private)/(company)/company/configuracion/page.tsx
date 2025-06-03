import { ProfileConfiguration } from '@/modules/company/configuracion/profile-configuration'
import { PersonalConfiguration } from '@/modules/company/configuracion/personal-configuration'
import { NotificationsConfiguration } from '@/modules/company/configuracion/notifications-configuration'

export default function ConfiguracionPage() {
  return (
    <div>
      <ProfileConfiguration />
      <PersonalConfiguration />
      <NotificationsConfiguration />
    </div>
  )
}
