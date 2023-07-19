import Avatar from "@/components/avatar/Avatar";
import Badge from "@/components/badge/Badge";
import Dropdown from "@/components/dropdown/Dropdown";
import Hover from "@/components/hover/Hover";
import Modal from "@/components/modal/Modal";
import Progress from "@/components/progress/Progress";
import Slider from "@/components/slider/Slider";
import Toast from "@/components/toast/Toast";
import { useState } from "react";

("cSpell: disable");

export default function Home() {
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  const [sliderValue, setSliderValue] = useState<number>(33);

  return (
    <main className="min-h-screen max-w-7xl m-auto pt-12 flex flex-col gap-10">
      <section id="avatar" className="flex flex-col gap-3 items-center">
        <h1 className="font-bold text-lg">Avatar</h1>
        <div className="flex flex-row gap-5">
          <Avatar>
            <Avatar.Image
              src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
              alt="profile picture"
            />
            <Avatar.Fallback>AD</Avatar.Fallback>
          </Avatar>
        </div>
      </section>

      <section id="modal" className="flex flex-col gap-3 items-center">
        <h1 className="font-bold text-lg">Modal</h1>
        <Modal>
          <Modal.Trigger className="bg-blue-500 px-5 py-2 text-white rounded">Open Modal</Modal.Trigger>
          <Modal.Content className="bg-white rounded flex flex-col justify-between text-black p-5 max-w-sm">
            <h1 className="font-semibold text-lg mb-2">Title of modal</h1>
            <p className="text-sm text-black/60">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>

            <Modal.Close className="text-blue-500 bg-blue-100 border border-blue-200 rounded self-end px-5 py-2 text-sm shadow">
              Close
            </Modal.Close>
          </Modal.Content>
          <Modal.Overlay className="bg-black/50 backdrop-blur-sm" />
        </Modal>
      </section>

      <section id="toast" className="flex flex-col gap-3 items-center">
        <h1 className="font-bold text-lg">Toast</h1>
        <button onClick={() => setToastOpen(true)} className="bg-blue-500 text-white cursor-pointer px-5 py-2 rounded">
          Open Toast
        </button>
        <Toast open={toastOpen} onOpenChange={setToastOpen}>
          <Toast.Content className="bg-white rounded shadow flex flex-col">
            <h1 className="text-black">The meeting has been scheduled</h1>
            <p className="text-black/50">Date: 23/10/2023</p>
            <Toast.Close className="text-xs text-blue-500 bg-blue-100 border-blue-200 shadow px-5 py-2 rounded border self-end mt-3">
              Close
            </Toast.Close>
          </Toast.Content>
        </Toast>
      </section>

      <section id="dropdown" className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-lg">Dropdown</h1>
        <Dropdown>
          <Dropdown.Trigger className="px-5 py-2 bg-blue-500 rounded">Open Dropdown</Dropdown.Trigger>
          <Dropdown.Content className="w-64 py-2 bg-white rounded top-14 absolute text-black text-sm">
            <ul className="flex flex-col">
              <li className="w-full px-5 hover:bg-blue-100">
                <button className="w-full h-full text-start py-2">Hello</button>
              </li>
              <li className="w-full px-5 hover:bg-blue-100">
                <button className="w-full h-full text-start py-2">World</button>
              </li>
              <li className="w-full px-5 hover:bg-blue-100">
                <button className="w-full h-full text-start py-2">From</button>
              </li>
              <li className="w-full px-5 hover:bg-blue-100">
                <button className="w-full h-full text-start py-2">Dropdown</button>
              </li>
              <li className="w-full px-5 hover:bg-blue-100">
                <button className="w-full h-full text-start py-2">Menu</button>
              </li>
            </ul>
          </Dropdown.Content>
          <Dropdown.Overlay />
        </Dropdown>
      </section>

      <section id="badge" className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-lg">Badges</h1>
        <div className="w-full flex items-center justify-center gap-2">
          <Badge>Default</Badge>
          <Badge type="info">Info</Badge>
          <Badge type="success">Success</Badge>
          <Badge type="warning">Warning</Badge>
          <Badge type="error">Error</Badge>
        </div>
      </section>

      <section id="hover" className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-lg">Hover</h1>
        <Hover>
          <Hover.Trigger>
            <div className="w-12 h-12 bg-blue-500 rounded-full select-none text-sm flex items-center justify-center text-center p-3 box-content">
              Hover me
            </div>
          </Hover.Trigger>
          <Hover.Content className="bottom-28">
            <div className="w-52 h-52 bg-white rounded p-5 text-black gap-2 flex flex-col items-center shadow-lg">
              <h1 className="text-lg font-semibold text-center underline">This is a hover card</h1>
              <p className="text-black text-sm text-center">
                This text is only visible when you are hovering the Trigger element of the component ❤
              </p>
            </div>
          </Hover.Content>
        </Hover>
      </section>

      <section id="progress" className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-lg">Progress</h1>
        <div className="w-full p-5">
          <Progress
            value={sliderValue}
            className="w-full max-w-sm bg-blue-950 h-4 flex flex-col items-start rounded-full mx-auto"
          >
            <Progress.Value className="text-xs self-center" />
            <Progress.Fill className="bg-blue-500 duration-200" />
          </Progress>
        </div>
      </section>

      <section id="slider" className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-lg flex flex-row gap-2">
          Slider{" "}
          <Badge className="font-normal text-xs px-2 py-0 self-center" type="warning">
            Beta
          </Badge>
        </h1>
        <div className="w-full flex items-center flex-col justify-center">
          <Slider
            className="bg-blue-500 text-blue-500 w-full max-w-[200px]"
            value={sliderValue}
            onChange={setSliderValue}
          />
        </div>
      </section>

      <div className="py-32 w-full flex items-center justify-center" />
    </main>
  );
}
