import { CloudDownloadOutlined } from '@ant-design/icons'
import { Card, Col, Layout, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Head from 'next/head'
import { FunctionComponent, useEffect, useState } from 'react'
import { MDHeader } from '../MDHeader/MDHeader'

export const MDPromptPWA: FunctionComponent = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null)
  const [isIos, setIsIos] = useState(false)

  useEffect(() => {
    const beforeInstallPromptHandler = (event: any) => {
      event.preventDefault()
      setInstallPromptEvent(event)
    }
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)

    setIsIos(
      ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    )
  }, [])

  const handleInstallAccepted = () => {
    installPromptEvent!.prompt()
  }

  return (
    <>
      <Head>
        <title>Installation - Jawad Admin</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <MDHeader />

        <Row justify="center" align="middle" style={{ flex: 1, textAlign: 'center' }}>
          <Col>
            <a onClick={handleInstallAccepted}>
              <Card
                hoverable
                cover={<img alt="Jawad Club App" src="/icon-256x256.png" />}
                style={{ width: '90vw', maxWidth: 480 }}
              >
                <Meta
                  title="Installer Jawad Club"
                  description="L'application qui va révolutionner la gestion de vos tables snooker"
                />
                {isIos ? (
                  <p style={{ marginTop: 24 }}>
                    Appuyez sur
                    <img
                      src="/icons/ios-share.png"
                      style={{ margin: 'auto 8px 8px' }}
                      alt="Add to homescreen"
                      width="20"
                    />
                    puis &quot;Ajouter à l&apos;écran d&apos;accueil&quot;
                  </p>
                ) : (
                  <p style={{ marginTop: 24 }}>
                    <CloudDownloadOutlined style={{ margin: 'auto 8px 8px' }} />
                    Cliquez ici pour installer
                  </p>
                )}
              </Card>
            </a>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
