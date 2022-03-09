import { notification as notificationAntd } from 'antd'

interface INotificationConfiguration {
  title: string
  description?: string
  type?: 'success' | 'warning' | 'error'
}

const notifications = {
  success: notificationAntd.success,
  warning: notificationAntd.warning,
  error: notificationAntd.error,
}

export const openNotification = ({ title, description, type = 'success' }: INotificationConfiguration): void => {
  const notification = notifications[type]
  notification({
    message: title,
    description,
    placement: 'bottomRight',
  })
}
