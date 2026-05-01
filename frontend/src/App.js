import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <PipelineToolbar />
      
      {/* Main Area */}
      <div className="flex flex-col flex-1 h-full min-w-0">
        {/* Canvas Area */}
        <div className="relative flex-1 bg-slate-950" style={{ height: 'calc(100vh - 100px)' }}>
          <PipelineUI />
        </div>
        
        {/* Submit Bar */}
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
