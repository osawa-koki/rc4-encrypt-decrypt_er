import React from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";
import setting from "../setting";

import { DataContext } from "../src/DataContext";
import { encrypt } from "../src/RC4";

export default function EncryptPage() {

  const { sharedData, setSharedData } = React.useContext(DataContext);
  const [encrypted, setEncrypted] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const Encrypt = () => {
    const encrypted = encrypt(sharedData.content, sharedData.key);
    if (encrypted === null) {
      setError('暗号化に失敗しました。');
      return;
    }
    setError(null);
    setSharedData({
      ...sharedData,
      encrypted,
    });
    setEncrypted(true);
  };

  const Copy = async () => {
    setCopied(true);
    navigator.clipboard.writeText(sharedData.encrypted);
    await new Promise((resolve) => setTimeout(resolve, setting.waitingTime));
    setCopied(false);
  };

  return (
    <Layout>
      <div id="Encrypt">
        <h1>Encrypt 🔏</h1>
        <Form>
          <Form.Group className="mt-3">
            <Form.Label>Enter Key</Form.Label>
            <Form.Control type="text" placeholder="my-key" value={sharedData.key} onInput={(e) => {
              setSharedData({
                ...sharedData,
                key: e.currentTarget.value,
              });
            }} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={5} value={sharedData.content} onInput={(e) => {
              setSharedData({
                ...sharedData,
                content: e.currentTarget.value,
              });
            }} />
          </Form.Group>
        </Form>
        <Button variant="primary" className="mt-3 d-block m-auto" onClick={Encrypt}>Encrypt 🔏</Button>
        {
          error !== null && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )
        }
        {
          encrypted && (
            <>
              <hr />
              <Alert variant="warning" className="mt-3">
                <Alert.Heading>Encrypted!</Alert.Heading>
                <Form.Control as="textarea" className="mt-3" rows={5} value={sharedData.encrypted} readOnly />
                <Button variant={copied ? "info" : "warning"} className="mt-3 d-block m-auto" size="sm" onClick={Copy}>
                  {
                    copied ? 'Copied!' : 'Copy'
                  }
                </Button>
              </Alert>
            </>
          )
        }
      </div>
    </Layout>
  );
};
