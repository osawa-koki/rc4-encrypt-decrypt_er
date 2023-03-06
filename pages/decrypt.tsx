import React from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";
import setting from "../setting";

import { DataContext } from "../src/DataContext";

export default function EncryptPage() {

  const { sharedData, setSharedData } = React.useContext(DataContext);
  const [decrypted, setDecrypted] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const Encrypt = () => {
    setSharedData({
      ...sharedData,
      decrypted: 'Decrypted!',
    });
    setDecrypted(true);
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
        <h1>Encrypt 🔓</h1>
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
            <Form.Control as="textarea" rows={5} value={sharedData.encrypted} onInput={(e) => {
              setSharedData({
                ...sharedData,
                encrypted: e.currentTarget.value,
              });
            }} />
          </Form.Group>
        </Form>
        <Button variant="primary" className="mt-3 d-block m-auto" onClick={Encrypt}>Decrypt 🔓</Button>
        {
          decrypted && (
            <>
              <hr />
              <Alert variant="warning" className="mt-3">
                <Alert.Heading>Decrypted!</Alert.Heading>
                <Form.Control as="textarea" className="mt-3" rows={5} value={sharedData.decrypted} readOnly />
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
